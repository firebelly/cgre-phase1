from fabric.api import *
import os

env.hosts = ['cgre.firebelly.co']
env.user = 'firebelly'
env.path = '~/Firebelly/cgre-phase1'
env.remotepath = '/home/firebelly/webapps/cgre_phase1'
env.grav_theme = 'cgre'
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
  clear_cache()

def clear_cache():
  with cd(env.remotepath):
    run('bin/grav clearcache')

def update():
  with cd(env.remotepath):
    run('git pull origin {0}'.format(env.git_branch))
  # upload fonts not in repo
  put('user/themes/{0}/fonts'.format(env.grav_theme), env.remotepath + '/user/themes/{0}/fonts/'.format(env.grav_theme))

def composer_install():
  with cd(env.remotepath):
    run('~/bin/composer install')
    run('bin/gpm update -y')
