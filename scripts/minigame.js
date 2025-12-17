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
    // SetCollisionEnabled(objectType1, objectType2, enabled) => Allows or disallows collisions between object types
    
    ////////////  RENDER ////////////////

    // GetSprite(index)
    // CreateSprite(file)  => Returns sprite index
	// ShowSprite(index)
	// HideSprite(index)

    ////////////  INPUT ////////////////

    // inputFireDown
    // inputLeftDown
    // inputRightDown
    // inputUpDown
    // inputDownDown
    // 
    // inputFirePressed
    // inputLeftPressed
    // inputRightPressed
    // inputUpPressed
    // inputDownPressed
    
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
    var objectTypeBox = 1;
    var objectTypePlatform = 2;
    var objectTypeMusic = 3;
	var objectTypeInstructions = 4;

    ///////////////////////////////////////////////////
    //              CREATE YOUR SCENE                //
    ///////////////////////////////////////////////////
    
    function CreateScene()
    {
        CreateObject("character", objectTypeCharacter, 100, 100, 50, 50);
        
        for(var i = 0; i < 20; i++)
        {
            CreateObject("ball", objectTypeBox, UtilsRandomRange(200, 700), UtilsRandomRange(100, 400), 50, 50);
        }

        CreateObject("music", objectTypeMusic, 0, 0, 0, 0);        
        
        CreateObject("floor", objectTypePlatform, 0, 500, 900, 100);        
        CreateObject("wallLeft", objectTypePlatform, 0, 100, 100, 400);        
        CreateObject("wallRight", objectTypePlatform, 800, 100, 100, 400);        
        CreateObject("ceiling", objectTypePlatform, 0, 0, 900, 100);    

        CreateObject("staticText", objectTypeInstructions, 200, 200, 500, 200);    
    }
    
    ///////////////////////////////////////////////////
    //              START YOUR OBJECTS               //
    ///////////////////////////////////////////////////
    
    function StartObject(index)
    {
        var o = objects[index];
        
        if(o.type == objectTypeCharacter)
        {
            o.sprite = CreateSprite("reference.png", "PlayerSprite");
			o.text = CreateText("Player", "PlayerText");
            o.collider = CreateCollider(bodyTypeKinematic, false);
        }
        else if(o.type == objectTypeBox)
        {
            o.sprite = CreateSprite("reference.png", "BoxSprite");
			o.text = CreateText("Dynamic box", "BoxText");
            o.collider = CreateCollider(bodyTypeDynamic, true);
            o.sound = CreateSound("reference-sound.wav", false);
        }
        else if(o.type == objectTypePlatform)
        {
            o.sprite = CreateSprite("reference.png", "PlatformSprite");
			o.text = CreateText("Platform", "PlatformText");
            o.collider = CreateCollider(bodyTypeKinematic, false);
        }
        else if(o.type == objectTypeMusic)
        {
            o.music = CreateSound("reference-music.wav", true);
            o.isPlaying = false;
        }
        else if(o.type == objectTypeInstructions)
        {
            o.text = CreateText("Move with WASD. Enable sound with space.", "InstructionsText");
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
            
            var target = RayCast(o.posX, o.posY, 1, 0, 1000, 1);
            
            if(target >= 0)
            {
                var targetObject = GetObject(target);
                var collider = GetCollider(targetObject.collider);
                
                collider.speedY = -200;                
                
            }
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
        if(object.type == objectTypeBox)
        {       
            var c = GetCollider(object.collider);
            
            if(Math.abs(c.speedX) > 50.0 || Math.abs(c.speedY) > 50.0)
            {
                PlaySound(object.sound);
            }

        }
    }
    