import io
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from notes.models import Note
from .serializers import NoteSerializer
from rest_framework.parsers import JSONParser
from rest_framework import status


def index(request):
    if request.is_ajax():
        if request.method == 'POST':
            stream = io.BytesIO(request.body)
            data = JSONParser().parse(stream)
            new_note = NoteSerializer().create(request.user, data)
            return JsonResponse(NoteSerializer(new_note).data, safe=False)
        else:
            serializer = NoteSerializer(Note.objects.filter(user=request.user).order_by('name'), many=True)
            return JsonResponse(serializer.data, safe=False)
    return render(request, 'notes/index.html', {})


def detail(request, pk):
    try:
        note = Note.objects.get(pk=pk)
    except Note.DoesNotExist:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        note.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)

