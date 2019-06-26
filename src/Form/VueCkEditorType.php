<?php

declare(strict_types=1);

namespace App\Form;

use FOS\CKEditorBundle\Form\Type\CKEditorType as BaseCkEditorType;
use Symfony\Component\Form\AbstractType;

final class VueCkEditorType extends AbstractType
{
    /**
     * @return string
     */
    public function getBlockPrefix(): string
    {
        return 'vue_ck_editor';
    }

    /**
     * @return string
     */
    public function getParent(): string
    {
        return BaseCkEditorType::class;
    }
}
