---
title: 'Contact'
contact_headline: more info coming in summer 2020. in the meantime, say hello.
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
                  autocomplete: on
                  type: text
                  validate:
                    required: true

                email:
                  id: email
                  classes: form-control form-control-lg
                  label: Email
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
