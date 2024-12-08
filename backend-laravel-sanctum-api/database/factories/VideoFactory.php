<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Video;
use Illuminate\Database\Eloquent\Factories\Factory;

class VideoFactory extends Factory
{
    protected $model = Video::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence, // Fake video title
            'description' => $this->faker->paragraph, // Fake description
            'url' => $this->faker->url, // Fake video URL
            'user_id' => User::factory(), // Creates and associates a user
        ];
    }
}
