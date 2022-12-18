FROM ubuntu:latest

ENV NVM_DIR /usr/local
ENV NODE_VERSION 18.12.1

ENV RUNNING_IN_DOCKER true
ENV NODE_ENV=development
ENV LANG en_US.utf8

RUN apt-get update --fix-missing -y
RUN apt-get install -y nano curl git build-essential libssl-dev zsh zsh-antigen fonts-firacode locales python3-dev python3-pip python3-setuptools \
    && rm -rf /var/lib/apt/lists/* \
	&& localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8

# RUN adduser --disabled-password node
# RUN usermod -aG sudo node
# RUN usermod -s $(which zsh) node

COPY .zshrc /root/.zshrc
RUN usermod -s $(which zsh) $(whoami)

#this line is required for nvm to work. https://www.kabisa.nl/tech/nvm-in-docker/
RUN rm /bin/sh && ln -s /bin/bash /bin/sh 
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/master/install.sh |  bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION --latest-npm

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH


RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/bashhistory/.bash_history" \
    && echo "$SNIPPET" >> "/root/.bashrc"

CMD ["zsh"]

RUN npm i -g npm @angular/cli nx
RUN pip install thefuck