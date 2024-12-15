<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        // Add 'isPrivate' column to the 'videos' table
        Schema::table('videos', function (Blueprint $table) {
            $table->boolean('isPrivate')->default(false); // Default to false (public)
        });
    }

    public function down()
    {
        // If we need to rollback, drop the 'isPrivate' column
        Schema::table('videos', function (Blueprint $table) {
            $table->dropColumn('isPrivate');
        });
    }
};
