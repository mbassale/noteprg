from django.urls import path

from . import views

app_name = 'lorem'
urlpatterns = [
    path('', views.index, name='index'),
]
