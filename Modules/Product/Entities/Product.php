<?php

namespace Modules\Product\Entities;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Product extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $table = 'products';
    protected $appends = ['image'];

    const IMAGE_COLLECTION = 'product_images';
    const MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
    const SIZES = [
        'extra_small' => [
            'h' => 480,
            'w' => 640,
        ],
        'small' => [
            'h' => 480,
            'w' => 720,
        ],
        'medium' => [
            'h' => 540,
            'w' => 960,
        ],
        'large' => [
            'h' => 720,
            'w' => 1280,
        ],
    ];
    
    protected $fillable = [
        'product_code',
        'product_note',
        'product_price',
        'product_cost',
        'product_quantity',
        'product_name',
        'product_stock_alert',
        'category_id',
        'user_id',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];

    /**
     * Get collection details.
     *
     * @return array
     */
    public function getCollectionDetails(): array {
        return [
            [
                'name' => self::IMAGE_COLLECTION,
                'is_single' => true,
                'mime_types' => self::MIME_TYPES,
                'sizes' => self::SIZES,
            ]
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Register media collections.
     *
     * @return void
     */
    public function addCollections(array $collections): void
    {
        foreach ($collections as $collection) {
            if ($collection['is_single']) {
                $this->addMediaCollection($collection['name'])
                    ->singleFile()
                    ->acceptsMimeTypes($collection['mime_types']);
                continue;
            }

            $this->addMediaCollection($collection['name'])
                ->acceptsMimeTypes($collection['mime_types']);
        }
    }

    /**
     * Register media collections.
     *
     * @return void
     */
    public function registerCollections(): void
    {
        $this->addCollections($this->getCollectionDetails());
    }

    public function registerMediaConversions(Media $media = null): void {
        $this->addMediaConversion('thumb')
            ->width(50)
            ->height(50);
    }

    public function getImageAttribute()
    {
        return $this->getFirstMediaUrl(self::IMAGE_COLLECTION);
    }
}
