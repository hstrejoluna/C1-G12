from django.db import models

# Create your models here.
class Company(models.Model):
    id = models.AutoFieldField(primary_key=True)
    name = models.CharField(max_length=255)
    license_no = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    contact_no = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    added_on = models.DateTimeField(auto_now_add=True)
    objects=models.Manager()


class Medicine(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    medical_typ = models.CharField(max_length=255)
    buy_price = models.CharField(max_length=255)
    sell_price = models.CharField(max_length=255)
    c_gst = models.CharField(max_length=255)
    s_gst = models.CharField(max_length=255)
    batch_no = models.CharField(max_length=255)
    shelf_no = models.CharField(max_length=255)
    expire_dat = models.DateField()
    mfg_date = models.DateField()
    company_id = models.ForeignKey(Company,on_delete=models.CASCADE)
    description=models.CharField(max_length=255)
    in_stock_total=models.IntegerField()
    added_on=models.DateTimeField(auto_now_add=True)

class MedicalDetails(models.Model):
    id=models.AutoField(primary_key=True)
    medicine_id=models.ForeignKey
    






