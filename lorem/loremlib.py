import random

WORDS = ("adipisci aliquam amet consectetur dolor dolore dolorem eius est et"
         "incidunt ipsum labore magnam modi neque non numquam porro quaerat qui"
         "quia quisquam sed sit tempora ut velit voluptatem").split()


def get_word():
    return random.choice(WORDS)


def get_sentence(num_of_words=None):
    if num_of_words is None:
        num_of_words = random.randrange(3, len(WORDS))
    return (' '.join(random.choices(WORDS, k=num_of_words)) + '.').capitalize()


def get_paragraph(num_of_sentences=None):
    if num_of_sentences is None:
        num_of_sentences = random.randrange(3, 6)
    index = 1
    paragraph = ''
    while index <= num_of_sentences:
        paragraph += get_sentence() + ' '
        index += 1
    return paragraph.strip()


def get_text(num_of_paragraphs=None):
    if num_of_paragraphs is None:
        num_of_paragraphs = random.randrange(3, 6)
    index = 1
    text = ''
    while index <= num_of_paragraphs:
        text += get_paragraph() + '\n'
        index += 1
    return text.strip()
