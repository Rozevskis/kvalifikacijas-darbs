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
}
