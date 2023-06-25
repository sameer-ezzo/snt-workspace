import { Component, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, filter, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'apps/web/src/environments/environment';

@Component({
  selector: 'upload-input',
  templateUrl: './upload-input.component.html',
  styleUrls: ['./upload-input.component.scss']
})
export class UploadInputComponent {
  @Input() allowedFileTypes: string[] = []
  private _maxFileSize: number = 1048576;
  @Input()
  public get maxFileSize(): number {
    return this._maxFileSize;
  }
  public set maxFileSize(value: number) {
    if (!value) this._maxFileSize = Math.max(0, value)
    else this._maxFileSize = value
  }
  @Input() maxFileCount: number = 2;

  uploadForm: FormGroup;

  valueChange = new EventEmitter<string[]>()

  private _value: string[] = [];
  @Input()
  public get value(): string[] {
    return this._value;
  }
  public set value(value: string[]) {
    this._value = value;
    this.valueControl.setValue(value, { onlySelf: true, emitEvent: false })
    for (const v of this._value) {
      this._tasks.set({ name: v }, { loading: false })
    }
  }
  valueControl: FormControl<string[] | null> = new FormControl([], [])
  fileControl: FormControl<File[] | null> = new FormControl(null, [
    Validators.required,
    this.fileTypeValidator.bind(this),
    this.fileSizeValidator.bind(this),
    this.filesCountValidator.bind(this)
  ]);

  constructor(private http: HttpClient) {
    this.uploadForm = new FormGroup({
      file: this.fileControl,
      value: this.valueControl
    });

    this.valueControl.valueChanges.pipe(debounceTime(250)).subscribe(v => this.valueChange.emit(v ?? []))

    this.fileControl.valueChanges.pipe(
      debounceTime(500),
      map(v => v ?? []),
      filter(v => v.length > 0)
    ).subscribe((v: File[]) => {
      // upload only new items 
      for (const file of v) {
        this._uploadFile(file)
      }
    })
  }

  delete(f:any) {

    const vidx = this.value.findIndex(v => v === f.name)
    if (vidx > -1) {
      this.value.splice(vidx, 1)
      this._tasks.delete(f)
    }

    this.valueControl.setValue(this.value)
  }

  get tasks() { return Array.from(this._tasks) }
  _tasks = new Map<File | { name: string }, any>()
  private _uploadFile(file: File) {
    this._tasks.set(file, { loading: true })

    const formData = new FormData()
    formData.append('file', file);


    const xhr = new XMLHttpRequest()
    xhr.open('POST', `${environment.base}/storage/upload`, true)

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        var percentage = (e.loaded / e.total) * 100;
        console.log(percentage + "%");
        this._tasks.set(file, { percentage, loading: true })
      }
    };



    xhr.onerror = (e) => {
      this._tasks.set(file, { loading: false, error: e })
      console.log('Error');
      console.log(e);
    };
    xhr.onload = () => {
      if (xhr.status === 201) {

        this._tasks.set(file, { loading: false })
        this.value.push(xhr.responseText)
        this.valueControl.setValue(this.value as any)
        console.log(this.uploadForm.value);

      } else {
        console.error('Request failed with status:', xhr.status);
      }
    };
    xhr.send(formData);
  }

  openFileSelector() {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.multiple = this.maxFileCount !== 1
    fileInput.style.display = 'none'
    fileInput.addEventListener('change', (e: any) => { this.fileControl.setValue(Array.from(e.target.files)) })
    fileInput.click();
  }

  submitForm() {
    const file = this.fileControl.value;
    console.log(file);
  }

  fileTypeValidator(control: FormControl): { [key: string]: any } | null {
    const allowed = this.allowedFileTypes ?? []
    if (allowed.length === 0) return null
    const invalids = (control.value ?? []).filter((f: File) => !allowed.includes(f.type))
    return invalids.length > 0 ? { fileType: true } : null
  }

  filesCountValidator(control: FormControl): { [key: string]: any } | null {
    const max = Math.max(this.maxFileCount ?? 1, 1)
    const files = control.value;
    if (!files) return null

    if ((files ?? []).length > max) return { filesCount: true }
    return null
  }

  fileSizeValidator(control: FormControl): { [key: string]: any } | null {
    if (!this.maxFileSize || this.maxFileSize === 0) return null
    const files = control.value ?? []
    const invalids = files.filter((f: File) => f.size > this.maxFileSize)
    return invalids.length > 0 ? { maxSize: true } : null
  }
}
