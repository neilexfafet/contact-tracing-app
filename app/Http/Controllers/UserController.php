<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Support\Str;
use Carbon\Carbon;
use File;
use App\Models\User;
use App\Models\UserDetails;
use App\Models\Trace;
use App\Models\Announcement;

class UserController extends Controller
{
    function index() {
        $view = User::with('getDetails')->get();
        return response()->json($view);
    }

    function getAuthDetails($id) {
        $view = UserDetails::all()->find($id);
        return response()->json($view);
    }

    function establishmentTrace($id) {
        $view = Trace::with('getEstablishment.getDetails')
            ->where('user_id', $id)
            ->orderByDesc('created_at')
            ->get()
            ->take(20);
        return response()->json($view);
    }

    function userTrace($id) {
        $view = Trace::with('getUser.getDetails')
            ->where('establishment_id', $id)
            ->orderByDesc('created_at')
            ->get()
            ->take(20);
        return response()->json($view);
    }

    function updateDetailsUser(Request $req) {
        $validator = Validator::make($req->all(), [
            'id' => 'required',
            'fname' => 'required',
            'lname' => 'required',
            'gender' => 'required',
            'bday' => 'required',
            'contact' => 'required',
            'address' => 'required',
        ], [
            'required' => 'Please input all required fields'
        ]);
        if($validator->fails()) {
            return response()->json([
                'error'=>$validator->errors()->first()
            ]);
        } else {
            $update = UserDetails::all()->find($req->input('id'));
            $update->first_name = $req->input('fname');
            $update->last_name = $req->input('lname');
            $update->gender = $req->input('gender');
            $update->birth_date = $req->input('bday');
            $update->contact_no = $req->input('contact');
            $update->address = $req->input('address');
            if($req->hasFile('image')) {
                File::delete('img/'.$update->image);
                $code = Str::random(20);
                $date = date('dmy');
                $image = $req->file('image');
                $ext = $image->getClientOriginalExtension();
                $image_full_name = $date.$code.'.'.$ext;
                $req->file('image')->move('img', $image_full_name);
                $update->image = $image_full_name;
            }
            $update->save();
            return response()->json([
                'success'=>'Personal details updated successfully!',
            ]);
        }
    }

    function updateDetailsEstablishment(Request $req) {
        $validator = Validator::make($req->all(), [
            'id' => 'required',
            'name' => 'required',
            'fname' => 'required',
            'lname' => 'required',
            'contact' => 'required',
            'address' => 'required',
        ], [
            'required' => 'Please input all required fields.'
        ]);
        if($validator->fails()) {
            return response()->json([
                'error'=>$validator->errors()->first()
            ]);
        } else {
            $update = UserDetails::all()->find($req->input('id'));
            $update->company_name = $req->input('name');
            $update->first_name = $req->input('fname');
            $update->last_name = $req->input('lname');
            $update->contact_no = $req->input('contact');
            $update->address = $req->input('address');
            if($req->hasFile('image')) {
                File::delete('img/'.$update->image);
                $code = Str::random(20);
                $date = date('dmy');
                $image = $req->file('image');
                $ext = $image->getClientOriginalExtension();
                $image_full_name = $date.$code.'.'.$ext;
                $req->file('image')->move('img', $image_full_name);
                $update->image = $image_full_name;
            }
            $update->save();
            return response()->json([
                'success'=>'Establishment details updated successfully!',
            ]);
        }
    }

    function updateLoginUser(Request $req) {
        $validator = Validator::make($req->all(), [
            'id' => 'required',
            'email' => 'required|email',
            'confirmPassword' => 'required|min:6'
        ], [
            'required' => 'Please input all required fields',
            'email.email' => 'Must be a valid E-Mail address',
            'min' => 'Must be at least 6 characters' 
        ]);
        if($validator->fails()) {
            return response()->json([
                'error'=>$validator->errors()->first()
            ]);
        } else {
            if(User::all()->where('email', $req->input('email'))->first() != null) {
                return response()->json(['error'=>'E-Mail already exists. Please try again']);
            } else {
                $update = User::all()->find($req->input('id'));
                if(Hash::check($req->input('confirmPassword'), $update->password)) {
                    $update->email = $req->input('email');
                    $update->save();
                    return response()->json(['success'=>'Email Updated Successfully!']);
                } else {
                    return response()->json(['error'=>'Password Invalid! Please Try Again.']);
                }
            }
        }
    }

    function updatePasswordUser(Request $req) {
        $validator = Validator::make($req->all(), [
            'id' => 'required',
            'password' => 'required|min:6',
            'newPassword' => 'required|min:6',
            'repeatpwd' => 'required|min:6|same:newPassword'
        ], [
            'required' => 'Please input all required fields',
            'min' => 'Must be atleast 6 characters',
            'same' => 'Passwords dont match.'
        ]);
        if($validator->fails()) {
            return response()->json([
                'error'=>$validator->errors()->first()
            ]);
        } else {
            $update = User::all()->find($req->input('id'));
            if(Hash::check($req->input('password'), $update->password)) {
                $update->password = Hash::make($req->input('newPassword'));
                $update->save();
                return response()->json(['success'=>'Password changed successfully!']);
            } else{
                return response()->json(['error'=>'Password Invalid! Please Try Again.']);
            }
        }
    }

    function post(Request $req) {
        $validator = Validator::make($req->all(), [
            'id' => 'required',
            'post' => 'required:min:10'
        ], [
            'required' => 'Please input required fields.',
            'min' => 'Must be atleast 10 characters.' 
        ]);
        if($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first()
            ]);
        } else {
            $add = new Announcement;
            $add->establishment_id = $req->input('id');
            $add->announcement = $req->input('post');
            $add->save();
            return response()->json([
                'success'=>'Posted Successfully'
            ]);
        }
    }

    function allPosts($id) {
        $view = Announcement::with('getEstablishment.getDetails')
            ->where('establishment_id', $id)
            ->orderByDesc('created_at')
            ->get();
        return response()->json($view);
    }

    function updatePost(Request $req) {
        $update = Announcement::all()->find($req->input('postId'));
        $update->announcement = $req->input('post');
        $update->save();
        return response()->json([
            'success' => 'Updated Successfully!'
        ]);
    }

    function deletePost(Request $req) {
        $find = Announcement::all()->find($req->input('postId'));
        $find->delete();
        return response()->json([
            'success' => 'Announcement Deleted'
        ]);
    }

    function traceUser(Request $req) {
        $add = new Trace;
        $add->establishment_id = $req->input('id');
        $add->user_id = $req->input('result');
        $add->save();
        return response()->json([
            'success' => 'Processed successfully'
        ]);
    }

    function traceEstablishment(Request $req) {
        $add = new Trace;
        $add->establishment_id = $req->input('result');
        $add->user_id = $req->input('id');
        $add->save();
        return response()-json([
            'success' => 'Processed successfully'
        ]);
    }

    function find($id) {
        $find = User::with('getDetails')->find($id);
        return response()->json($find);
    }
}
