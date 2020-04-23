from django.urls import path

from . import views

app_name = 'colorhelper'
urlpatterns = [
    path('', views.index, name='index'),
]