# Akismet Contact Form Check for Grav

A plugin to be called in contact form handling (via form YAML) to check the form submission against Akismet.

Example implementation (make sure `akismet` is first to avoid sending emails on positive):

```
process:
  - akismet:
      name: "{{ form.value.name }}"                       # name for Akismet
      email: "{{ form.value.email }}"                     # email for Akismet
      organization: "{{ form.value.organization }}"       # organization for Akismet
      message: "{{ form.value.message }}"                 # message for Akismet
      failureRedirect: '/contact/spam'                    # page to redirect to if spam (must be relative to base url)
      failureMessage: 'Your submission was spammy.'       # ... or message to respond with if AJAX response
      botherDev: your-email@domain.com                    # if set, sends debug email to this on positive Akismet trigger
  ...
```

# Configuration

```
enabled: true
akismetKey: your-key-here
```
