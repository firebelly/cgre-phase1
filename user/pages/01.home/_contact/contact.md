---
title: 'Contact'
contact_headline: more info coming in summer 2020. in the meantime, say hello.
form:
    name: contact-form
    action: '/home'
    template: form-messages
    refresh_prevention: true
    fields:
        namefieldset:
            type: fieldset
            classes: 'contact-info -two-column'
            fields:
                name:
                  id: name
                  label: Name
                  autocomplete: on
                  type: text
                  validate:
                    required: true

                email:
                  id: email
                  label: Email
                  type: email
                  validate:
                    rule: email
                    required: true

        orgfieldset:
            type: fieldset
            classes: 'org-info -two-column'
            fields:
                organization:
                  id: organization
                  label: Organization
                  autocomplete: on
                  type: text

                focus:
                  id: focus
                  label: Focus
                  placeholder: Select Focus...
                  type: select
                  size: long
                  options:
                      national: 'National'
                      state: 'State Level'
                      both: 'Both'

        message:
          label: Message
          size: long
          type: textarea
          validate:
            required: true

    buttons:
        - type: submit
          value: Submit

    process:
        - email:
            from: "{{ config.plugins.email.from }}"
            to:
              - "{{ config.plugins.email.to }}"
              - "{{ form.value.email }}"
            subject: "CGRE contact from {{ form.value.name|e }}{{ form.value.organization ? ' - '~form.value.organization|e : '' }}"
            body: "{% include 'forms/data.html.twig' %}"
        - save:
            fileprefix: contact-
            dateformat: Ymd-His-u
            extension: txt
            body: "{% include 'forms/data.txt.twig' %}"
        - message: Success! We sent you a copy as well, for your convenience.
---
