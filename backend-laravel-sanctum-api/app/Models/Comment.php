<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['content', 'user_id', 'video_id'];

    // Specify the primary key type as a UUID
    protected $keyType = 'string';
    public $incrementing = false;

    // Boot method to automatically generate a UUID when creating a comment
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    // Relationship with User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relationship with Video
    public function video()
    {
        return $this->belongsTo(Video::class);
    }
}
