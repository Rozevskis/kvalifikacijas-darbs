<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Video extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'url'];

    // Specify the primary key type as a UUID
    protected $keyType = 'string';
    public $incrementing = false;

    // Boot method to automatically generate a UUID when creating a video
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    // Define the many-to-many relationship with Playlist
    public function playlists()
    {
        return $this->belongsToMany(Playlist::class, 'playlist_video');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
