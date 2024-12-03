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
            new Middleware('auth:sanctum', except: ['index', 'show']),
        ];
    }
    public function index()
    {
        $videos = Video::with('user')->latest()->get();
        return response()->json($videos);
    }

    public function store(Request $request)
    {
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
        return response()->json($video->load('user'));
    }

    public function update(Request $request, Video $video)
    {
        if ($request->user()->id !== $video->user_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $fields = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'url' => 'sometimes|required',
        ]);

        $video->update($fields);

        return response()->json($video);
    }

    public function destroy(Request $request, Video $video)
    {
        if ($request->user()->id !== $video->user_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $video->delete();

        return response()->json(null, 204);
    }
}
