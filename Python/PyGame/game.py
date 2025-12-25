import pygame
from sys import exit

pygame.init() # initializes pygame

# Parameters are width and height respectively
screen = pygame.display.set_mode((800, 400))

# Changes the title of the window
pygame.display.set_caption('Runner')
clock = pygame.time.Clock()

# Arguments are font type and font size
test_font = pygame.font.Font('font/Pixeltype.ttf', 50)

'''
test_surface = pygame.Surface((100, 200))
test_surface.fill('Red')
'''

sky_surface = pygame.image.load('graphics/Sky.png').convert() # converts the image to something pygame can work with better
ground_surface = pygame.image.load('graphics/ground.png').convert()
text_surface = test_font.render('My Game', False, 'Black') # Arguments are text to display, Anti-Aliase (if you want to round the font), color of text

snail_surf = pygame.image.load('graphics/snail/snail1.png').convert_alpha() # better for moving objects
snail_rect = snail_surf.get_rect(midbottom = (600, 300))

player_surf = pygame.image.load('graphics/player/player_walk_1.png').convert_alpha()
player_rect = player_surf.get_rect(midbottom = (80, 300))
while True :
    # draw all elements
    # update everything

    for event in pygame.event.get() :
        if event.type == pygame.QUIT : # QUIT is constant synonymous with x on window
            pygame.quit() # Opposite of pygame.init()
            exit() # this stops the loop and terminates the program
        '''
        if event.type == pygame.BUTTONDOWN :
            print('mouse down')
        

        if event.type == pygame.MOUSEMOTION :
            if player_rect.collidepoint(event.pos) :
                print('collision')
        '''


    # blit is to place things on display surfaces, numbers are the coordinates where to place "top left" of the surface
    screen.blit(sky_surface,(0, 0))
    screen.blit(ground_surface, (0, 300))
    screen.blit(text_surface, (300, 50))

    snail_rect.x -= 4
    if snail_rect.right < 0 :
        snail_rect.left = 800
    screen.blit(snail_surf, snail_rect)
    screen.blit(player_surf, player_rect)

    # collisions with rectangles
    '''if player_rect.colliderect(snail_rect) :
        print('collision')'''

    # getting mouse position for different types of collision
    # pygame.mouse() is used for mouse positions, clicks, buttons, visibility, etc.
    mouse_pos = pygame.mouse.get_pos()
    if player_rect.collidepoint(mouse_pos) :
        print(pygame.mouse.get_pressed())

    pygame.display.update()
    clock.tick(60) # sets the maximum framerate as 60 FPS
