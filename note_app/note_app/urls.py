from django.urls import path,include
from .views import signup_view, login_view,notes_view,logout_view,edit_notes_view,delete_notes_view
from django.contrib import admin
from django.contrib.auth import views as auth_views




urlpatterns = [
    path('', signup_view, name='signup'),
    path('admin/', admin.site.urls),
    path('login', login_view, name="login"),
    path('notes', notes_view, name="notes"),
    path('logout/', logout_view, name="logout"),  # Add logout URL
    path('edit_notes/<int:srno>', edit_notes_view, name="edit_notes"),
    path('delete_notes/<int:srno>', delete_notes_view)
]   
