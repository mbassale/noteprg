from django.http import HttpResponse
from django.shortcuts import render

from .forms import LoremForm
from .loremlib import *


def index(request):
    form = None
    lorem_text = None
    if request.method == 'POST':
        form = LoremForm(request.POST)
        if form.is_valid():
            word_count = form.cleaned_data['word_count'] or 0
            sentence_count = form.cleaned_data['sentence_count'] or 0
            paragraph_count = form.cleaned_data['paragraph_count'] or 0
            if paragraph_count > 0:
                lorem_text = get_text(paragraph_count, sentence_count, word_count)
            elif sentence_count > 0:
                lorem_text = get_paragraph(sentence_count, word_count)
            elif word_count > 0:
                lorem_text = get_sentence(word_count)
    else:
        form = LoremForm

    if lorem_text is None:
        lorem_text = get_text(3)
    return render(request, 'lorem/index.html', {
        'form': form,
        'lorem_text':  lorem_text.split('\n')
    })
