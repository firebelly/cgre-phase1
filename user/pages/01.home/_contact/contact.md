---
title: 'Contact'
form:
    name: contact-form
    action: /home
    fields:
        contact-fieldset:
            type: fieldset
            classes: 'contact-info -two-column'
            fields:
                name:
                  id: name
                  label: Name
                  classes: form-control form-control-half
                  placeholder: Enter your name
                  autocomplete: on
                  type: text
                  validate:
                    required: true

                email:
                  id: email
                  classes: form-control form-control-lg
                  label: Email
                  placeholder: Enter your email address
                  type: email
                  validate:
                    rule: email
                    required: true

        org-fieldset:
            type: fieldset
            classes: 'org-info -two-column'
            fields:
                name:
                  id: organization
                  label: Organization
                  classes: form-control form-control-half
                  placeholder: Enter your organization name
                  autocomplete: on
                  type: text
                  validate:
                    required: true

                focus:
                  id: focus
                  classes: form-control form-control-lg
                  label: Focus
                  placeholder: Select Focus...
                  type: select
                  size: long
                  help: 'Testing help'
                  options:
                      national: 'National'
                      state: 'State Level'
                      both: 'Both'

                  validate:
                    required: true

        message:
          label: Message
          classes: form-control form-control-lg
          size: long
          placeholder: Enter your message
          type: textarea
          validate:
            required: true

    buttons:
        - type: submit
          value: Submit
          classes: btn btn-primary btn-block

    process:
        - email:
            from: "{{ config.plugins.email.from }}"
            to:
              - "{{ config.plugins.email.from }}"
              - "{{ form.value.email }}"
            subject: "[Feedback] {{ form.value.firstname|e }} {{ form.value.lastname|e }}"
            body: "{% include 'forms/data.html.twig' %}"
        - save:
            fileprefix: feedback-
            dateformat: Ymd-His-u
            extension: txt
            body: "{% include 'forms/data.txt.twig' %}"
        - message: Thank you for your feedback!
        - display: thankyou
---

<h3 class="divot">Contact Us</h3>

<div class="body-wrap">
  <h2>
    more info
    coming in
    summer
    2020. in the
    meantime,
    say hello.
  </h2>
</div>

<svg class="offset -animate" width="70" height="541" viewBox="0 0 70 541" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="70" height="1" transform="matrix(-1 0 0 1 70 0)" fill="#FC4F60"/>
  <rect width="70" height="1" transform="matrix(-1 0 0 1 70 240)" fill="#FC4F60"/>
  <rect width="70" height="1" transform="matrix(-1 0 0 1 70 120)" fill="#FC4F60"/>
  <rect width="70" height="1" transform="matrix(-1 0 0 1 70 360)" fill="#FC4F60"/>
  <rect width="70" height="1" transform="matrix(-1 0 0 1 70 60)" fill="#FC4F60"/>
  <rect width="70" height="1" transform="matrix(-1 0 0 1 70 300)" fill="#FC4F60"/>
  <rect width="70" height="1" transform="matrix(-1 0 0 1 70 180)" fill="#FC4F60"/>
  <rect width="70" height="1" transform="matrix(-1 0 0 1 70 420)" fill="#FC4F60"/>
  <rect width="70" height="1" transform="matrix(-1 0 0 1 70 510)" fill="#FC4F60"/>
  <rect width="70" height="1" transform="matrix(-1 0 0 1 70 30)" fill="#FC4F60"/>
  <rect width="70" height="1" transform="matrix(-1 0 0 1 70 270)" fill="#FC4F60"/>
  <rect width="70" height="1" transform="matrix(-1 0 0 1 70 150)" fill="#FC4F60"/>
  <rect width="70" height="1" transform="matrix(-1 0 0 1 70 390)" fill="#FC4F60"/>
  <rect width="70" height="1" transform="matrix(-1 0 0 1 70 480)" fill="#FC4F60"/>
  <rect width="70" height="1" transform="matrix(-1 0 0 1 70 90)" fill="#FC4F60"/>
  <rect width="70" height="1" transform="matrix(-1 0 0 1 70 330)" fill="#FC4F60"/>
  <rect width="70" height="1" transform="matrix(-1 0 0 1 70 210)" fill="#FC4F60"/>
  <rect width="70" height="1" transform="matrix(-1 0 0 1 70 450)" fill="#FC4F60"/>
  <rect width="70" height="1" transform="matrix(-1 0 0 1 70 540)" fill="#FC4F60"/>
</svg>
