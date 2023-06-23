import { Controller, Post, Req } from '@nestjs/common';

@Controller('admin/antiques')
// @UseGuards(AuthService)
export class AntiquesController {

  constructor() { }

  @Post()
  list(@Req() req: Request) {
    console.log(req.body)


  }

}



