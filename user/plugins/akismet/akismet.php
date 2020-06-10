<?php

namespace Grav\Plugin;

use Grav\Common\Plugin;
use RocketTheme\Toolbox\Event\Event;

// Akismet class
require_once 'microakismet/class.microakismet.inc.php';

/**
 * Class AkismetPlugin
 * @package Grav\Plugin
 * Place this plugin before all processes that should be prevented
 *
 * Excerpted from grantforgood/user/pages/07.contact/form.md:
 *
 * process:
 *  - akismet:
 *      name: "{{ form.value.name }}"                       # name for Akismet
 *      email: "{{ form.value.email }}"                     # email for Akismet
 *      organization: "{{ form.value.organization }}"       # organization for Akismet
 *      message: "{{ form.value.message }}"                 # message for Akismet
 *      failureRedirect: '/contact/spam'                    # Page to redirect to if spam (must be relative to base url)
 *      botherDev: true                                     # if true, plugin sends debug emails here
 *      akismetKey: yourkeyhere                             # key for Akismet
 *      devEmail: developer@firebellydesign.com             # for sending debug notifications / dumps TO
 *      contactFormEmail: "{{ config.plugins.email.from }}" # for sending debug notifications / dumps FROM
 *  - email:                                                # the proceeding processes will only be called if not spam...
 *   ...
 */
class AkismetPlugin extends Plugin
{
  // Hook into form processing
  public static function getSubscribedEvents()
  {
    return [
      'onFormProcessed' => ['onFormProcessed', 0]
    ];
  }

  // Called when looping through actions
  public function onFormProcessed(Event $event)
  {
    $action = $event['action'];

    // If akismet is our action
    switch ($action) {
      case 'akismet':

        // Get all the submission info
        $form = $event['form'];
        $params = $event['params'];

        // Parse parameters
        $twig = $this->grav['twig'];
        $twigVars = [ 'form' => $form ];

        $message            = $twig->processString($params['message'], $twigVars);
        $author             = $twig->processString($params['name'], $twigVars);
        $authorEmail        = $twig->processString($params['email'], $twigVars);
        $organization       = $twig->processString($params['organization'], $twigVars);
        $botherDev          = !empty($params['botherDev']) ? $twig->processString($params['botherDev'], $twigVars) : '';
        $failureRedirect    = !empty($params['failureRedirect']) ? $twig->processString($params['failureRedirect'], $twigVars) : '';
        $failureMessage     = !empty($params['failureMessage']) ? $twig->processString($params['failureMessage'], $twigVars) : '';

        // Try to get akismetKey from config
        $akismetKey = $this->config->get('plugins.akismet.akismetKey');
        if (empty($akismetKey)) {
          return [
              'status'  => 'error',
              'message' => 'Akismet key not set in config'
          ];
        }

        // URI info
        $uri = $this->grav['uri'];
        $base_url = $uri->base();
        $host_url = $uri->host();

        // Fire up Akismet
        $akismetHomepage = $base_url;
        $akismetUserAgent = $host_url.'/1.0';
        $akismet = new \MicroAkismet($akismetKey, $akismetHomepage, $akismetUserAgent);

        // Get all the Akismet parameters we need
        $akismet_vars['user_ip']              = $_SERVER['REMOTE_ADDR'];
        $akismet_vars['user_agent']           = $_SERVER['HTTP_USER_AGENT'];
        $akismet_vars['referrer']             = $_SERVER['HTTP_REFERER'];
        $akismet_vars['comment_content']      = $message;
        $akismet_vars['comment_author']       = $author;
        $akismet_vars['comment_author_email'] = $authorEmail;
        $akismet_vars['comment_type']         = 'contact-form';
        $akismet_vars['organization']         = $organization;

        // Execute Akismet test
        $failedAkismetTest = $akismet->check($akismet_vars);

        // Failure behavior
        if($failedAkismetTest) {

          // Prevent any other form handling processes from being called
          $event->stopPropagation();

          $this->grav['log']->addWarning('Form Akismet Positive: [' . $uri->route() . '] ' . json_encode($akismet_vars));

          // Send an email to the dev?
          if(!empty($botherDev)) {

            $email = $this->grav['Email'];
            $subject = ($failedAkismetTest ? 'Failed' : 'Successful').' contact form submission from '.$authorEmail.' - '.$host_url;
            $content = '<h2>Akismet triggered:</h2><pre>'.json_encode($akismet_vars, JSON_PRETTY_PRINT).'</pre>';

            $message = $email->message($subject, $content, 'text/html')
              ->setFrom('hal@'.$host_url)
              ->setTo($botherDev);

            $email->send($message);

          }

          if (!empty($failureMessage)) {

            $this->grav->fireEvent('onFormValidationError', new Event([
              'form'    => $form,
              'message' => $failureMessage
            ]));

          } elseif (!empty($failureRedirect)) {

            // Redirect to failure notice page
            header('Location: ' . $base_url . $failureRedirect, true, 302);

          }
        }
        return;

      break;
    }
  }
}
