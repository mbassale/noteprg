from django.contrib.auth.models import User, Group
from rest_framework import serializers
from notes.models import Note


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'name', 'content', 'user']

    def create(self, user, validated_data=None):
        if validated_data is None:
            validated_data = self.validated_data
        return Note.objects.create(user=user, **validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.content = validated_data.get('content', instance.content)
        instance.save()
        return instance
