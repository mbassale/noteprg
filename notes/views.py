from django.http import JsonResponse
from django.shortcuts import render
from notes.models import Note
from .serializers import NoteSerializer


def index(request):
    if request.is_ajax():
        serializer = NoteSerializer(Note.objects.filter(user=request.user).order_by('name'), many=True)
        return JsonResponse(serializer.data, safe=False)
    return render(request, 'notes/index.html', {})
