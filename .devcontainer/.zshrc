source /usr/share/zsh-antigen/antigen.zsh
# Load custom aliases
[[ -s "$HOME/.bash_aliases" ]] && source "$HOME/.bash_aliases"

zmodload zsh/zprof

export PATH=$HOME/bin:/usr/local/bin:$PATH

# https://blog.mattclemente.com/2020/06/26/oh-my-zsh-slow-to-load/
export NVM_LAZY_LOAD=true
export NVM_COMPLETION=true

antigen bundle lukechilds/zsh-nvm
antigen bundle Sparragus/zsh-auto-nvm-use

antigen use oh-my-zsh
antigen bundle git
antigen bundle docker
antigen bundle command-not-found
antigen bundle zsh-users/zsh-syntax-highlighting
antigen bundle zsh-users/zsh-completions
antigen bundle zsh-users/zsh-autosuggestions
antigen bundle zsh-users/zsh-docker
antigen bundle zsh-users/zsh-history-substring-search
antigen bundle thefuck
antigen theme awesomepanda
antigen apply

eval $(thefuck --alias)