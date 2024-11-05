<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class VideoController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: []),
        ];
    }
    public function index()
    {
        $videos = Video::with('user')->get(); // Fetch videos with associated user data
        return response()->json($videos);
    }

    public function store(Request $request)
    {
        // Validate incoming request data
        $fields = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            // 'url' => 'required|url',
            'url' => 'required',
        ]);

        $video = $request->user()->videos()->create($fields);

        return response()->json($video, 201); 
    }


    public function show(Video $video)
    {
        //
    }

    public function update(Request $request, Video $video)
    {
        //
    }

        // Update the video
        $video->update($request->only(['title', 'description', 'url']));

        return response()->json($video); 
    }

    public function destroy(Video $video)
    {
        //
    }
}
