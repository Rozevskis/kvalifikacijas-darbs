<?php

namespace Tests\Feature;

use App\Models\Video;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VideoControllerUnauthorizedTest extends TestCase
{
    use RefreshDatabase;
    public function test_unauthorized_user_cannot_update_video()
    {
        $user1 = User::factory()->create(); // Create a user
        $user2 = User::factory()->create(); // Create a second user
        $video = Video::factory()->create(['user_id' => $user1->id]); // Create a video owned by user1

        $newData = [
            'title' => 'Updated Test Video',
            'description' => 'Updated description.',
            'url' => 'http://test.com/updated_video.mp4',
        ];

        $response = $this->actingAs($user2, 'sanctum')->putJson("/api/videos/{$video->id}", $newData);

        $response->assertStatus(403); // Unauthorized response
        $response->assertJson(['error' => 'Unauthorized']);
    }

    public function test_unauthorized_user_cannot_delete_video()
    {
        $user1 = User::factory()->create(); // Create a user
        $user2 = User::factory()->create(); // Create a second user
        $video = Video::factory()->create(['user_id' => $user1->id]); // Create a video owned by user1

        $response = $this->actingAs($user2, 'sanctum')->deleteJson("/api/videos/{$video->id}");

        $response->assertStatus(403); // Unauthorized response
        $response->assertJson(['error' => 'Unauthorized']);
    }
}
