<?php

declare(strict_types=1);

namespace App\Controller;

use App\Form\VueColorPickerType;
use App\Form\VueProponentChoiceType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    /**
     * @Route("/")
     *
     * @return Response
     */
    public function index(): Response
    {
        return $this->render('base.html.twig');
    }

    /**
     * @Route("/color")
     *
     * @param Request $request
     * @return Response
     */
    public function color(Request $request): Response
    {
        $data = ['color' => '#ff0000'];
        $form = $this->createFormBuilder($data)
            ->add('color', VueColorPickerType::class, [
                'label' => 'Color',
                'help' => 'Pick a Color',
            ])
            ->getForm();
        $form->handleRequest($request);

        return $this->render('colorPicker.html.twig', [
            'form' => $form->createView(),
            'data' => $form->getData(),
        ]);
    }

    /**
     * @Route("/select")
     *
     * @param Request $request
     * @return Response
     */
    public function select(Request $request): Response
    {
        $data = ['color' => '3'];
        $form = $this->createFormBuilder($data)
                     ->add('color', VueProponentChoiceType::class)
                     ->getForm();
        $form->handleRequest($request);

        return $this->render('select.html.twig', [
            'form' => $form->createView(),
            'data' => $form->getData(),
        ]);
    }

    /**
     * @Route("/users")
     *
     * @return Response
     */
    public function skills(): Response
    {
        return $this->json([
            ['id' => 1, 'label' => 'User 1'],
            ['id' => 2, 'label' => 'User 2'],
            ['id' => 3, 'label' => 'User 3'],
            ['id' => 4, 'label' => 'User 4'],
            ['id' => 5, 'label' => 'Steve 4'],
        ]);
    }
}
