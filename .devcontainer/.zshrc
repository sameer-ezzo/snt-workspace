source /usr/share/zsh-antigen/antigen.zsh

export PATH=$HOME/bin:/usr/local/bin:/home/node/.local/bin:$PATH
export NVM_DIR=/home/node/nvm
# https://blog.mattclemente.com/2020/06/26/oh-my-zsh-slow-to-load/
export NVM_LAZY_LOAD=true
export NVM_COMPLETION=true
# Load custom aliases

[[ -s "$HOME/.bash_aliases" ]] && source "$HOME/.bash_aliases"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

zmodload zsh/zprof

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
antigen bundle npm
antigen bundle history
antigen bundle colorize

antigen apply

eval $(thefuck --alias)
