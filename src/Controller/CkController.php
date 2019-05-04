<?php

declare(strict_types=1);

namespace App\Controller;

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
        return $this->render('ck.html.twig');
    }
}
