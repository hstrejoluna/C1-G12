from django.contrib import admin
from .models import ExtendUser, Doctor, Patient, SysAdmin
from django.apps import apps
# Register your models here.
admin.site.register(ExtendUser)
admin.site.register(Doctor)
admin.site.register(Patient)
admin.site.register(SysAdmin)

app = apps.get_app_config('graphql_auth')

for model_name, model in app.models.items():
    admin.site.register(model)