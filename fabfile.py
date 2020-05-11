from fabric.api import *
import os

env.hosts = ['cgre.firebelly.co']
env.user = 'firebelly'
env.path = '~/Firebelly/cgre-phase1'
env.remotepath = '/home/firebelly/webapps/cgre_phase1'
env.git_branch = 'master'
env.warn_only = True

def production():
  env.hosts = ['cgre.com']
  env.remotepath = '/home/firebelly/webapps/cgre'
  env.git_branch = 'master'

def deploy(composer='y'):
  update()
  if composer == 'y':
    composer_install()

def update():
  with cd(env.remotepath):
    run('git pull origin {0}'.format(env.git_branch))

def composer_install():
  with cd(env.remotepath):
    run('php74 ~/bin/composer.phar install')
