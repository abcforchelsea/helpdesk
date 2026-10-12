<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'demo@helpdesk.test'],
            ['name' => 'Demo User', 'password' => 'Demo12345!']
        );

        if ($user->tickets()->count() === 0) {
            $user->tickets()->create([
                'title' => 'Printer not working',
                'description' => 'The office printer shows an offline error.',
                'priority' => 'High',
                'status' => 'Open',
                'category' => 'Hardware',
            ]);
        }
    }
}