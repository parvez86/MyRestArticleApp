from django.template.defaulttags import url
from django.urls import path, include
from rest_framework.routers import DefaultRouter
# from .views import article_list, article_details
# from .views import ArticleList, ArticleDetail
from rest_framework.urlpatterns import format_suffix_patterns
from .views import ArticleViewSet, UserViewSet
# from .views import ArticleDetailViewSet

router = DefaultRouter()
router.register('articles', ArticleViewSet, basename="articles")
router.register('users', UserViewSet, basename='users')
# router.register('articles/<int:pk>/', ArticleDetailViewSet, basename="articleDetail")

urlpatterns = [
    # path('articles/', article_list),
    # path('articles/<int:pk>/', article_details),
    # path('articles/', ArticleList.as_view()),
    # path('articles/<int:pk>/', ArticleDetail.as_view())
    path('api/', include(router.urls))
]

# api view
# for viewset ' format=None'
# urlpatterns = format_suffix_patterns(urlpatterns)