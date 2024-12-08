<?php

namespace Tests\Feature;

use App\Models\Video;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VideoControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_fetch_all_videos()
    {
        // Seed the database with videos
        $videos = Video::factory()->count(3)->create();

        $response = $this->getJson('/api/videos');

        $response->assertStatus(200);

        $response->assertJsonCount(3);

        // Assert the structure of each video in the response
        $response->assertJsonStructure([
            '*' => [
                'id',
                'title',
                'description',
                'url',
                'user_id',
                'created_at',
                'updated_at',
            ],
        ]);
    }
    public function test_can_create_video()
    {
        $user = User::factory()->create(); // Create a user to associate with the video
        $data = [
            'title' => 'Test Video',
            'description' => 'This is a test description.',
            'url' => 'http://test.com/video.mp4',
        ];

        $response = $this->actingAs($user, 'sanctum')->postJson('/api/videos', $data);

        $response->assertStatus(201);
        $response->assertJson([
            'title' => 'Test Video',
            'description' => 'This is a test description.',
            'url' => 'http://test.com/video.mp4',
            'user_id' => $user->id,
        ]);
    }
    public function test_can_show_video()
    {
        $video = Video::factory()->create(); // Create a video
        $response = $this->getJson("/api/videos/{$video->id}");

        $response->assertStatus(200);
        $response->assertJson([
            'id' => $video->id,
            'title' => $video->title,
            'description' => $video->description,
            'url' => $video->url,
            'user_id' => $video->user_id,
        ]);
    }

    public function test_can_update_video()
    {
        $user = User::factory()->create(); // Create a user
        $video = Video::factory()->create(['user_id' => $user->id]); // Create a video for this user

        $newData = [
            'title' => 'Updated Test Video',
            'description' => 'Updated description.',
            'url' => 'http://test.com/updated_video.mp4',
        ];

        $response = $this->actingAs($user, 'sanctum')->putJson("/api/videos/{$video->id}", $newData);

        $response->assertStatus(200);
        $response->assertJson([
            'id' => $video->id,
            'title' => 'Updated Test Video',
            'description' => 'Updated description.',
            'url' => 'http://test.com/updated_video.mp4',
        ]);
    }


}
