<?php

declare(strict_types=1);

namespace App\Controller;

use App\Form\VueCkEditorType;
use FOS\CKEditorBundle\Form\Type\CKEditorType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CkController extends AbstractController
{
    /**
     * @Route("/ck")
     *
     * @return Response
     */
    public function ck(): Response
    {
        $data = new \StdClass();
        $data->ck1 = 'Test 1';
        $data->ck2 = '<p>Test <b>22</b></p>';

        $form = $this->createFormBuilder($data)
            ->add('ck1', CKEditorType::class)
            ->add('ck2', VueCkEditorType::class, [
                'config_name' => 'defaultEditor',
            ])
            ->getForm();

        return $this->render('ck.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}
