from django.http import HttpResponse


def index(request):
    return HttpResponse("TechHub Django server is running.")
