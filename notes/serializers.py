from .models import Note
from rest_framework import serializers


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'name', 'content', 'user']

    def create(self, user, validated_data=None):
        if validated_data is None:
            validated_data = self.validated_data
        return Note.objects.create(user=user, **validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.email)
        instance.content = validated_data.get('content', instance.content)
        instance.save()
        return instance

