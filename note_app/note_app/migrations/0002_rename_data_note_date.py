# Generated by Django 5.1.5 on 2025-03-13 10:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('note_app', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='note',
            old_name='data',
            new_name='date',
        ),
    ]
