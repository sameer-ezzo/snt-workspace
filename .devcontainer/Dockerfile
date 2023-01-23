FROM ubuntu:latest

ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID
ARG USER_DIR=/home/${USERNAME}

ENV RUNNING_IN_DOCKER true
ENV NODE_ENV=development
ENV LANG en_US.utf8
ENV NODE_VERSION lts
ENV NVM_DIR ${USER_DIR}/nvm
ENV NODE_PATH $NVM_DIR/v"$NODE_VERSION"/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v"$NODE_VERSION"/bin:$PATH



RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    && apt-get update --fix-missing -y\
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

USER $USERNAME

RUN sudo apt-get update --fix-missing -y \
    && sudo apt-get install -y sudo nano curl git build-essential libssl-dev jq zsh zsh-antigen fonts-firacode locales python3-dev python3-pip python3-setuptools thefuck \
    && sudo rm -rf /var/lib/apt/lists/* \
    && sudo localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias $LANG



COPY .zshrc $USER_DIR/.zshrc
RUN sudo chown -R $USER_UID:$USER_GID $USER_DIR
RUN sudo usermod -s $(which zsh) $USERNAME

RUN sudo mkdir ${USER_DIR}/zsh_history \
    && sudo touch ${USER_DIR}/zsh_history/.zsh_history \
    && sudo chown -R $USERNAME ${USER_DIR}/zsh_history

RUN SNIPPET="\nexport PROMPT_COMMAND='history -a' && export HISTFILE=${USER_DIR}/zsh_history/.zsh_history" \
    && echo "$SNIPPET" >> "$USER_DIR/.zshrc"

RUN sudo mkdir -p ${USER_DIR}/.vscode-server/extensions \
    && sudo chown -R $USERNAME ${USER_DIR}/.vscode-server 

RUN sudo mkdir -p ${NVM_DIR} \
    && sudo chown -R $USERNAME ${NVM_DIR} 
#this line is required for nvm to work. https://www.kabisa.nl/tech/nvm-in-docker/
RUN sudo rm /bin/sh && sudo ln -s /bin/bash /bin/sh 
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/master/install.sh | sh \
    && source $NVM_DIR/nvm.sh \
    && nvm install "--$NODE_VERSION" --latest-npm \
    && npm i -g npm @angular/cli nx

# COPY --from=docker:dind-rootless /usr/local/bin/docker /usr/local/bin/
