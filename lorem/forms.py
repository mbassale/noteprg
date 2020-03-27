from django import forms


class LoremForm(forms.Form):
    word_count = forms.IntegerField(label='Word Count', required=False)
    sentence_count = forms.IntegerField(label='Sentence Count', required=False)
    paragraph_count = forms.IntegerField(label='Paragraph Count', required=False)
