from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from note_app.note_app import models
from note_app.note_app.models import NOTE
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate,login,logout

def signup_view(request):
    if request.method=="POST":
        name=request.POST.get('name')
        emailid=request.POST.get('email')
        pwd=request.POST.get('pwd')
        print(name,emailid,pwd)
        my_user = User.objects.create_user(name,emailid,pwd)
        my_user.save()
        return redirect('/login')
    
    return render(request, 'signup.html')

def login_view(request):
    if request.method=='POST':
        name=request.POST.get('name')
        pwd=request.POST.get('pwd')
        print(name,pwd)
        user_name=authenticate(request, username=name, password=pwd)
        if user_name is not None:
            login(request,user_name)
            return redirect('/notes')
        else:
            return redirect('/login')
    return render(request, 'login.html')

@login_required(login_url='/login')
def notes_view(request):
    if request.method=='POST':
        title= request.POST.get('title')
        content=request.POST.get('content')
        print(title)
        obj=models.NOTE(title=title,content=content , user=request.user)
        obj.save()
        res=models.NOTE.objects.filter(user=request.user).order_by('-date')
        return redirect('/notes',{'res':res})
    res=models.NOTE.objects.filter(user=request.user).order_by('-date')
    return render(request, 'notes.html', {'res':res})
@login_required(login_url='/login')
def edit_notes_view(request,srno):
    if request.method=='POST':
        title= request.POST.get('title')
        content=request.POST.get('content')
        print(title)
        obj=models.NOTE.objects.get(srno=srno)
        obj.title=title
        obj.content =content
        obj.save()
       
        return redirect('/notes')
    obj=models.NOTE.objects.get(srno=srno)
    
    return render(request, 'note_app/edit_notes.html', {'note': obj})
@login_required(login_url='/login')
def delete_notes_view(request,srno):
    obj=models.NOTE.objects.get(srno=srno)
    obj.delete()
    return redirect('/notes')
def logout_view(request):
    logout(request)
    return redirect('/login')  