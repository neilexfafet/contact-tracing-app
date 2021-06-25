<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Str;
use Carbon\Carbon;
use File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Auth;
use App\Models\User;
use App\Models\UserDetails;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    protected $redirectTo = '/';

    public function __construct() {
        $this->middleware('guest:user')->except('logout');
    }

    function login(Request $req) {
        $validator = Validator::make($req->all(), [
            'email' => 'required|email',
            'password' => 'required|min:6'
        ], [
            'email.required' => 'E-Mail is required',
            'email.email' => 'Must be a valid E-Mail address.',
            'password.required' => 'Password is required',
            'password.min' => 'Password must be at least 6 characters'
        ]);
        if($validator->fails()) {
            return response()->json([
                'error'=>$validator->errors()->first()
            ]);
        } else {
            if(Auth::guard('user')->attempt(['email'=>$req->email, 'password'=>$req->password])) {
                $user = User::with('getDetails')->find(Auth::guard('user')->user()->id);
                $token = $user->createToken('authToken')->plainTextToken;
                return response()->json([
                    'success'=>'Logged In', 
                    'token'=>$token,
                    'message'=>'Welcome, '.$user->getDetails->first_name,
                ]);
            } else {
                return response()->json(['failed'=>'Not registered']);
            }
        }
    }

    function registerUser(Request $req) {
        $validator = Validator::make($req->all(), [
            'fname' => 'required',
            'lname' => 'required',
            'gender' => 'required',
            'bday' => 'required|date',
            'contact' => 'required',
            'address' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6',
            'repeatpwd' => 'required|min:6|same:password'
        ], [
            'required' => 'Please input all required fields.',
            'bday.date' => 'Must be a valid date format',
            'email.email'=>'Must be a valid E-Mail Address.',
            'password.min'=>'Password must be at least 6 characters',
            'repeatpwd.min'=>'Password must be at least 6 characters',
            'repeatpwd.same'=>'Passwords dont Match.'
        ]);
        if($validator->fails()) {
            return response()->json([
                'error'=>$validator->errors()->first()
            ]);
        } else {
            if(User::all()->where('email', $req->input('email'))->first() != null) {
                return response()->json([
                    'failed'=>'E-Mail already registered'
                ]);
            } else {
                $add = new UserDetails;
                $add->first_name = $req->input('fname');
                $add->last_name = $req->input('lname');
                $add->gender = $req->input('gender');
                $add->birth_date = $req->input('bday');
                $add->contact_no = $req->input('contact');
                $add->address = $req->input('address');
                if($req->hasFile('image')) {
                    $code = Str::random(20);
                    $date = date('dmy');
                    $image = $req->file('image');
                    $ext = $image->getClientOriginalExtension();
                    $image_full_name = $date.$code.'.'.$ext;
                    $req->file('image')->move('img', $image_full_name);
                    $add->image = $image_full_name;
                }
                $add->save();
                $add2 = new User;
                $add2->email = $req->input('email');
                $add2->password = Hash::make($req->input('password'));
                $add2->role = 'user';
                $add2->details_id = $add->id;
                $add2->save();
                return response()->json(['success'=>'Registered Successfully!']);
            }
        }
    }

    function registerEstablishment(Request $req) {
        $validator = Validator::make($req->all(), [
            'name' => 'required',
            'address' => 'required',
            'address_lat' => 'required',
            'address_lng' => 'required',
            'contact' => 'required',
            'fname' => 'required',
            'lname' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6',
            'repeatpwd' => 'required|min:6|same:password'
        ], [
            'address_lat.required'=>'Please pin your address on the map',
            'address_lng.required'=>'Please pin your address on the map',
            'required' => 'Please input all required fields.',
            'email.email'=>'Must be a valid E-Mail Address.',
            'password.min'=>'Password must be at least 6 characters',
            'repeatpwd.min'=>'Password must be at least 6 characters',
            'repeatpwd.same'=>'Passwords dont Match.',
        ]);
        if($validator->fails()) {
            return response()->json([
                'error'=>$validator->errors()->first()
            ]);
        } else {
            if(User::all()->where('email', $req->input('email'))->first() != null) {
                return response()->json([
                    'failed'=>'E-Mail already registered'
                ]);
            } else {
                $add = new UserDetails;
                $add->company_name = $req->input('name');
                $add->first_name = $req->input('fname');
                $add->last_name = $req->input('lname');
                $add->address = $req->input('address');
                $add->address_lat = $req->input('address_lat');
                $add->address_lng = $req->input('address_lng');
                $add->contact_no = $req->input('contact');
                if($req->hasFile('image')) {
                    $code = Str::random(20);
                    $date = date('dmy');
                    $image = $req->file('image');
                    $ext = $image->getClientOriginalExtension();
                    $image_full_name = $date.$code.'.'.$ext;
                    $req->file('image')->move('img', $image_full_name);
                    $add->image = $image_full_name;
                }
                $add->save();
                $add2 = new User;
                $add2->email = $req->input('email');
                $add2->password = Hash::make($req->input('password'));
                $add2->role = 'establishment';
                $add2->details_id = $add->id;
                $add2->save();
                return response()->json(['success'=>'Registered Successfully!']);
            }
        }
    }

    function logout(Request $req) {
        $user = Auth::user();
        auth()->user()->tokens()->where('id', $user->currentAccessToken()->id)->delete();
        Auth::guard('user')->logout();
        return response()->json([
            'message'=>'You have been logged out from your session.',
        ]);
    }
}
