    ///////////////////////////////////////////////////
    //       VARIABLES & FUNCTIONS YOU CAN USE       //
    ///////////////////////////////////////////////////
    
    ////////////  SYSTEM ////////////////

    // timeStep  => Seconds passed between updates. Read only.
    
    ////////////  SCENE ////////////////

    // GetObject(index)
    // CreateObject(name, type, posX, posY, width, height) => Returns object index
    
    ////////////  PHYSICS ////////////////
    
    // gravity => Read and write.
    
    // GetCollider(index)
    // CreateCollider(movementType, hasGravity) => Returns collider index
    
    ////////////  RENDER ////////////////

    // GetSprite(index)
    // CreateSprite(file)  => Returns sprite index

    ////////////  INPUT ////////////////

    // inputFireDown;
    // inputLeftDown;
    // inputRightDown;
    // inputUpDown;
    // inputDownDown;
    // 
    // inputFirePressed;
    // inputLeftPressed;
    // inputRightPressed;
    // inputUpPressed;
    // inputDownPressed;
    
    ////////////  SOUND ////////////////    
    
    // CreateSound(file, loop)  => Returns sound index
    // PlaySound(index)
    // StopSound(index)
    
    ////////////  UTILS ////////////////    

    // UtilsRandomRange(a, b)
    // UtilsRandomRangeInt(a, b)
 
    ///////////////////////////////////////////////////
    //              DEFINE YOUR OBJECT TYPES         //
    ///////////////////////////////////////////////////
    
    var objectTypeCharacter = 0;
    var objectTypeBall = 1;
    var objectTypePlatform = 2;
    var objectTypeMusic = 3;

    ///////////////////////////////////////////////////
    //              CREATE YOUR SCENE                //
    ///////////////////////////////////////////////////
    
    function CreateScene()
    {
        CreateObject("character", objectTypeCharacter, 100, 100, 50, 50);
        
        for(var i = 0; i < 20; i++)
        {
            CreateObject("ball", objectTypeBall, UtilsRandomRange(200, 700), UtilsRandomRange(100, 400), 50, 50);
        }

        CreateObject("music", objectTypeMusic, 0, 0, 0, 0);        
        
        CreateObject("floor", objectTypePlatform, 0, 500, 900, 100);        
        CreateObject("wallLeft", objectTypePlatform, 0, 100, 100, 400);        
        CreateObject("wallRight", objectTypePlatform, 800, 100, 100, 400);        
        CreateObject("ceiling", objectTypePlatform, 0, 0, 900, 100);        
    }
    
    ///////////////////////////////////////////////////
    //              START YOUR OBJECTS               //
    ///////////////////////////////////////////////////
    
    function StartObject(index)
    {
        var o = objects[index];
        
        if(o.type == objectTypeCharacter)
        {
            o.sprite = CreateSprite("reference.png");
            o.collider = CreateCollider(bodyTypeKinematic, false);
        }
        else if(o.type == objectTypeBall)
        {
            o.sprite = CreateSprite("reference.png");
            o.collider = CreateCollider(bodyTypeDynamic, true);
            o.sound = CreateSound("reference-sound.wav", false);
        }
        else if(o.type == objectTypePlatform)
        {
            o.sprite = CreateSprite("reference.png");
            o.collider = CreateCollider(bodyTypeKinematic, false);
        }
        else if(o.type == objectTypeMusic)
        {
            o.music = CreateSound("reference-music.wav", true);
            o.isPlaying = false;
        }
        
    }
    
    ///////////////////////////////////////////////////
    //              UPDATE YOUR OBJECTS               //
    ///////////////////////////////////////////////////

    function UpdateObject(index)
    {
        var o = objects[index];
        
        if(o.type == objectTypeCharacter)
        {
            if(inputLeftPressed) { o.posX += -200 * timeStep; }
            if(inputRightPressed) { o.posX += 200 * timeStep; }
            if(inputUpPressed) { o.posY += -200 * timeStep; }
            if(inputDownPressed) { o.posY += 200 * timeStep; }
        }
        else if(o.type == objectTypeMusic)
        {
            if(inputFireDown)
            {
                if(!o.isPlaying)
                {
                    PlaySound(o.music);
                    o.isPlaying = true;
                }
            }
        }
    }
    
    ///////////////////////////////////////////////////
    //            RESPOND TO INPUT EVENTS            //
    ///////////////////////////////////////////////////
    
    function OnObjectClicked(object)
    {
        if(object.collider >= 0)
        {
            var c = GetCollider(object.collider);
            if(c.movementType == bodyTypeDynamic)
            {
                c.speedX += UtilsRandomRange(-500, 500);
                c.speedY += UtilsRandomRange(-500, 500);
            }
        }
        
    }
    
    ///////////////////////////////////////////////////
    //              RESPOND TO COLLISIONS            //
    ///////////////////////////////////////////////////
    
    function OnObjectCollision(object, otherObject)
    {
        if(object.type == objectTypeBall)
        {       
            var c = GetCollider(object.collider);
            
            if(Math.abs(c.speedX) > 50.0 || Math.abs(c.speedY) > 50.0)
            {
                PlaySound(object.sound);
            }

        }
    }
    