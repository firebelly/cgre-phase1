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
  env.hosts = ['cgre.org']
  env.remotepath = '/home/firebelly/webapps/cgre_phase1_production'
  env.git_branch = 'master'

def deploy(composer = 'y'):
  update()
  if composer == 'y':
    composer_install()
  clear_cache()

def clear_cache():
  with cd(env.remotepath):
    run('bin/grav clearcache')

def update(initial = 'n'):
  with cd(env.remotepath):
    run('git pull origin {0}'.format(env.git_branch))
  # upload items not in repo
  if initial == 'y':
    put('user/themes/{0}/fonts'.format(env.grav_theme), env.remotepath + '/user/themes/{0}/fonts/'.format(env.grav_theme))

def composer_install():
  with cd(env.remotepath):
    run('~/bin/composer install')
