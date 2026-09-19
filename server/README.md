# Django server scaffold

Minimal Django project scaffold for the TechHub server.

Setup (Windows):

```powershell
python -m venv env
env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Create new apps with `python manage.py startapp yourapp` and add them to `INSTALLED_APPS`.
