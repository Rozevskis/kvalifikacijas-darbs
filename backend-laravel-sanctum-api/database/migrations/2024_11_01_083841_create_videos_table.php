<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('videos', function (Blueprint $table) {
            $table->uuid('id')->primary(); // Use UUID as the primary key
            $table->foreignUuid('user_id')->constrained('users');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('url');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('videos');
    }
};
