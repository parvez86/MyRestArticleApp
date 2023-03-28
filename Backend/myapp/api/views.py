from django.shortcuts import render, HttpResponse
from .models import Article
from .serializers import ArticleSerializer, UserSerializer
from django.http import JsonResponse, Http404
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view, APIView, permission_classes
from rest_framework.response import Response
from rest_framework import mixins
from rest_framework import generics
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST,HTTP_204_NO_CONTENT, HTTP_201_CREATED, HTTP_404_NOT_FOUND
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User
# Create your views here.
# def Index(request):
#     return HttpResponse("The project is working");

'''
# Api based views
@api_view(['GET', 'POST'])
def article_list(request):
    if request.method == 'GET':
        articles = Article.objects.all()
        serializer = ArticleSerializer(articles, many=True)
        # return JsonResponse(serializer.data, safe=False)
        return Response(serializer.data, status=HTTP_200_OK)

    elif request.method == 'POST':
        # data = JSONParser().parse(request)
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # return JsonResponse(serializer.data, status=HTTP_201_CREATED)
            return Response(serializer.data, status=HTTP_201_CREATED)
        # return JsonResponse(serializer.errors, status=HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def article_details(request, pk):
    try:
        article = Article.objects.get(pk=pk)
    except Article.DoesNotExist:
        # return HttpResponse(404)
        return Response(status=HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = ArticleSerializer(article)
        # return JsonResponse(serializer.data)
        return Response(serializer.data, status=HTTP_200_OK)
    elif request.method == "PUT":
        # data = JSONParser().parse(request)
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid():
            serializer.save()
            # return JsonResponse(serializer.data, status=HTTP_201_CREATED)
            return Response(serializer.data, status=HTTP_201_CREATED)
        # return JsonResponse(serializer.errors, status=HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        article.delete()
        # return JsonResponse(data={}, safe=False, status=HTTP_204_NO_CONTENT)
        return Response(status=HTTP_204_NO_CONTENT)
'''
'''
# class based view
class ArticleList(APIView):

    def get(self, request):
        articles = Article.objects.all()
        serializer = ArticleSerializer(articles, many=True)
        # return JsonResponse(serializer.data, safe=False)
        return Response(serializer.data, status=HTTP_200_OK)

    def post(self, request):
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # return JsonResponse(serializer.data, status=HTTP_201_CREATED)
            return Response(serializer.data, status=HTTP_201_CREATED)
        # return JsonResponse(serializer.errors, status=HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class ArticleDetail(APIView):
    def get_object(self, pk):
        try:
            article = Article.objects.get(pk=pk)
            return article;
        except Article.DoesNotExist:
            # return HttpResponse(404)
            # return Response(status=HTTP_404_NOT_FOUND)
            raise Http404

    def get(self, request, pk, format=None):
        article = self.get_object(pk)
        serializer = ArticleSerializer(article)
        # return JsonResponse(serializer.data)
        return Response(serializer.data, status=HTTP_200_OK)

    def put(self, request, pk, format=None):
        article = self.get_object(pk)
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid():
            serializer.save()
            # return JsonResponse(serializer.data, status=HTTP_201_CREATED)
            return Response(serializer.data, status=HTTP_201_CREATED)
        # return JsonResponse(serializer.errors, status=HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        article = self.get_object(pk)
        article.delete()
        # return JsonResponse(data={}, safe=False, status=HTTP_204_NO_CONTENT)
        return Response(status=HTTP_204_NO_CONTENT)

'''

'''
# Using Mixins and Generic View
class ArticleList(generics.GenericAPIView,
                  mixins.ListModelMixin,
                  mixins.CreateModelMixin):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def get(self, request):
        return self.list(request);

    def post(self, request):
        return self.create(request)


class ArticleDetail(generics.GenericAPIView,
              mixins.RetrieveModelMixin,
              mixins.UpdateModelMixin,
              mixins.DestroyModelMixin):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    lookup_field = 'pk'

    def get(self, request, pk):
        return self.retrieve(request, id=pk)

    def put(self, request, pk):
        return self.update(request, id=pk)

    def delete(self, request, pk):
        return self.destroy(request, id=pk)
'''

'''
# view set
class ArticleViewSet(viewsets.ViewSet):
    """
        A simple ViewSet for listing or retrieving users.
    """

    def list(self, request):
        queryset = Article.objects.all()
        serializer = ArticleSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Article.objects.all()
        article = get_object_or_404(queryset, pk=pk)
        serializer = ArticleSerializer(article)
        return Response(serializer.data)

    def create(self, request):
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class ArticleDetailViewSet(viewsets.ViewSet):
    def retrieve(self, request, pk=None):
        queryset = Article.objects.all()
        article = get_object_or_404(queryset, pk=pk)
        serializer = ArticleSerializer(article)
        return Response(serializer.data)

    def update(self, request, pk=None):
        article = Article.objects.get(pk=pk);
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        article = Article.objects.get(pk=pk)
        article.delete()
        return Response(status=HTTP_204_NO_CONTENT)
'''

'''
class ArticleViewSet(viewsets.GenericViewSet,
                     mixins.ListModelMixin,
                     mixins.CreateModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin
                     ):
    """
    A viewset that provides `retrieve`, `create`, and `list` actions.

    To use it, override the class and set the `.queryset` and
    `.serializer_class` attributes.
    """

    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
'''


class ArticleViewSet(viewsets.ModelViewSet):
    """
    A viewset that provides `retrieve`, `create`, and `list` actions.

    To use it, override the class and set the `.queryset` and
    `.serializer_class` attributes.
    """

    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [TokenAuthentication]