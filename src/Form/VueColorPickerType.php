<?php

declare(strict_types=1);

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class VueColorPickerType extends AbstractType
{
    /**
     * @return string
     */
    public function getBlockPrefix(): string
    {
        return 'vue_color_picker';
    }

    /**
     * @return string
     */
    public function getParent(): string
    {
        return TextType::class;
    }
}
